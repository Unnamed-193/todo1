import { useEffect, useState } from 'react';
import List from '../components/List';
import API_URL from '../api';
import { Link } from 'react-router-dom';
export interface DealApi {
  deal: string;
  id: number;
  isActive: boolean;
}

function MainPage() {
  const [deals, setDeals] = useState<DealApi[]>([]);
  const [value, setValue] = useState<string>('');

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
  }, []); // Зависимости в [] означают, что эффект выполнится только один раз при монтировании

  async function createTask() {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deal: value,
          isActive: false,
        }),
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const newDeal = await res.json(); // Получаем новое дело из ответа
      setDeals((prevDeals) => [...prevDeals, newDeal]); // Обновляем состояние, добавляя новое дело
      setValue('');
    } catch (error) {
      console.error('Error fetching deals:', error);
    }
  }

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
      <h1>Todo List</h1>
      <div className='links'>
        <Link to='/'>in progress</Link>
        <Link to='/progress'>is done</Link>
      </div>
      <div className='form'>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className='inputTask'
          type='text'
          placeholder='Добавить'
        />
        <button className='createTask' onClick={createTask}></button>
      </div>
      {deals?.some((deal) => !deal.isActive) ? (
        <List deals={deals.filter((deal) => !deal.isActive)} onDelete={deleteTask} />
      ) : (
        <h1>Список пуст :(</h1>
      )}
    </>
  );
}

export default MainPage;
