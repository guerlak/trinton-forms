'use client';

import { useState } from 'react';
import styles from './MultiStepForm.module.css';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

type FormData = {
  name: string;
  email: string;
  phone: string;
  bonus: string;
};

const bonusOptions = [
  { id: 'bonus1', title: 'Brinde', desc: 'Brinde' },
  { id: 'bonus2', title: 'Não for dessa vez', desc: 'Não for dessa vez' },
  { id: 'bonus3', title: '30% Off', desc: '30% Off' },
  { id: 'bonus4', title: '18% Off', desc: '18% Off' },
]

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    bonus: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const maskPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  const updateField = (field: keyof FormData, value: string) => {
    let finalValue = value;
    if (field === 'phone') {
      finalValue = maskPhone(value);
    }

    setFormData((prev) => ({ ...prev, [field]: finalValue }));

    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const nextStep = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!validateEmail(formData.email)) newErrors.email = 'E-mail inválido';
    if (formData.phone.replace(/\D/g, '').length < 10) newErrors.phone = 'Telefone incompleto';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStep((s) => s + 1);
  };
  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Enviando para o Supabase...', formData);
      const { data, error } = await supabase
        .from('leads')
        .insert([
          {
            full_name: formData.name,
            email: formData.email,
            phone: formData.phone,
            bonus_selected: formData.bonus
          }
        ]);

      if (error) {
        // Código 23505 é o erro de 'unique constraint' no PostgreSQL
        if (error.code === '23505') {
          alert('Este e-mail já está cadastrado! Você já garantiu seu bônus.');
          return;
        }
        console.error('Erro detalhado do Supabase:', error);
        throw error;
      }

      console.log('Sucesso:', data);
      setStep(3);
    } catch (error: any) {
      console.error('Erro ao enviar:', error);
      alert(`Erro: ${error.message || 'Erro desconhecido ao salvar os dados'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.formContainer} glass`}>
      <div className={styles.logoContainer}>
        <Image 
          src="/triton-red-icon.png" 
          alt="Triton Logo" 
          width={80} 
          height={80} 
          className={styles.logo}
        />
      </div>

      {step === 1 && (
        <div className="animate-in">
          <h1 className={styles.title}>Bem-vindo</h1>
          <p className={styles.subtitle}>Preencha seus dados para começar</p>

          <div className={styles.stepIndicator}>
            <div className={`${styles.dot} ${styles.dotActive}`}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Nome Completo</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Ex: João Silva"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              required
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>E-mail</label>
            <input
              type="email"
              className={styles.input}
              placeholder="exemplo@email.com"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              required
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>WhatsApp / Telefone</label>
            <input
              type="tel"
              className={styles.input}
              placeholder="(00) 00000-0000"
              value={formData.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              required
            />
            {errors.phone && <span className={styles.error}>{errors.phone}</span>}
          </div>

          <button
            className={styles.button}
            disabled={!formData.name || !formData.email || !formData.phone}
            onClick={nextStep}
          >
            Próximo Passo
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="animate-in">
          <h1 className={styles.title}>Seleção de Bônus</h1>
          <p className={styles.subtitle}>Escolha uma das opções abaixo para continuar</p>

          <div className={styles.stepIndicator}>
            <div className={styles.dot}></div>
            <div className={`${styles.dot} ${styles.dotActive}`}></div>
            <div className={styles.dot}></div>
          </div>

          <div className={styles.bonusGrid}>
            {bonusOptions.map((b) => (
              <div
                key={b.id}
                className={`${styles.bonusCard} ${formData.bonus === b.title ? styles.bonusCardSelected : ''}`}
                onClick={() => updateField('bonus', b.title)}
              >
                <span className={styles.bonusTitle}>{b.title}</span>
                <span className={styles.bonusDesc}>{b.desc}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              className={styles.button}
              style={{ background: 'rgba(255,255,255,0.05)', flex: 1 }}
              onClick={prevStep}
            >
              Voltar
            </button>
            <button
              className={styles.button}
              style={{ flex: 2 }}
              disabled={!formData.bonus || loading}
              onClick={handleSubmit}
            >
              {loading ? 'Enviando...' : 'Finalizar Cadastro'}
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="animate-in" style={{ textAlign: 'center' }}>
          <div className={styles.successIcon}>✓</div>
          <h1 className={styles.title}>Sucesso!</h1>
          <p className={styles.subtitle}>
            Seus dados foram enviados e seu bônus <strong>{formData.bonus}</strong> está sendo processado.
            Em breve entraremos em contato.
          </p>
          <button
            className={styles.button}
            onClick={() => window.location.reload()}
          >
            Voltar ao Início
          </button>
        </div>
      )}
    </div>
  );
}
