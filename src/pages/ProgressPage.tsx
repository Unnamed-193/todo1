import { NavLink } from 'react-router-dom';
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
      <h1 className='title'>Done List</h1>
      <div className='links'>
      <NavLink 
          to='/' 
          className={({ isActive }) => (isActive ? 'active-link' : 'link')}
        >
          in progress
        </NavLink>
        <NavLink 
          to='/progress' 
          className={({ isActive }) => (isActive ? 'active-link' : 'link')} 
        >
          is done
        </NavLink>
      </div>
      {deals?.some((deal) => deal.isActive) ? (
        <List deals={deals.filter((deal) => deal.isActive)} onDelete={deleteTask} />
      ) : (
        <h1 className='empty'>Список пуст :(</h1>
      )}
    </>
  );
}

export default ProgressPage;
