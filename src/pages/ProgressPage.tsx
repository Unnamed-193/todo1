import { Link } from 'react-router-dom';
import API_URL from '../api';
import { useEffect, useState } from 'react';
import { DealApi } from './MainPage';
import List from '../components/List';

function ProgressPage() {
  const [deals, setDeals] = useState<DealApi[]>([]);
  useEffect(() => {
    // Вызов API
    const fetchDeals = async () => {
      try {
        const res = await fetch(API_URL, {
          method: 'GET',
        });

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const data: DealApi[] = await res.json();

        setDeals(data);
      } catch (error) {
        console.error('Error fetching deals:', error);
      }
    };

    fetchDeals(); // Вызов функции получения данных
  }, []);

  async function deleteTask(dealId: string) {
    try {
      const res = await fetch(`${API_URL}/${dealId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      setDeals((prevDeals) => prevDeals.filter((deal) => deal.id !== Number(dealId)));
    } catch (error) {
      console.error('Error deleting deal:', error);
    }
  }

  return (
    <>
      <h1>Done List</h1>
      <div className='links'>
        <Link to='/'>in progress</Link>
        <Link to='/progress'>is done</Link>
      </div>
      {deals?.some((deal) => deal.isActive) ? (
        <List deals={deals.filter((deal) => deal.isActive)} onDelete={deleteTask} />
      ) : (
        <h1>Список пуст :(</h1>
      )}
    </>
  );
}

export default ProgressPage;
