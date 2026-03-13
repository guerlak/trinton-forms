'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import styles from './dashboard.module.css';
import Link from 'next/link';

type Lead = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  bonus_selected: string;
};

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error('Erro ao buscar leads:', error);
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard de Leads</h1>
          <Link href="/" className={styles.backBtn}>
            ← Voltar para o Formulário
          </Link>
        </div>
        
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{leads.length}</span>
            <span className={styles.statLabel}>Total de Leads</span>
          </div>
        </div>
      </header>

      <div className={`${styles.tableWrapper} glass`}>
        {loading ? (
          <div className={styles.loading}>Carregando leads...</div>
        ) : leads.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Data</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Bônus</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                    {formatDate(lead.created_at)}
                  </td>
                  <td style={{ fontWeight: '600' }}>{lead.full_name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone}</td>
                  <td>
                    <span className={styles.bonusTag}>
                      {lead.bonus_selected || 'Nenhum'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={styles.empty}>
            <p>Nenhum lead encontrado ainda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
