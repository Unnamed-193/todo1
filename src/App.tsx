import { useEffect, useState } from 'react';
import List from './components/List';
import './App.css'

export interface DealApi {
  deal: string
  id: number
  isActive: boolean;
}

function App() {
  const [deals, setDeals] = useState<DealApi[]>([]);
  const [value, setValue] = useState<string>('')

  useEffect(() => {
    // Вызов API
    const fetchDeals = async () => {
      try {
        const res = await fetch('https://6384b6a12c0a4af9.mokky.dev/items', {
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
      const res = await fetch('https://6384b6a12c0a4af9.mokky.dev/items', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          deal: value,
          isActive: false
        })
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const newDeal = await res.json(); // Получаем новое дело из ответа
      setDeals(prevDeals => [...prevDeals, newDeal]); // Обновляем состояние, добавляя новое дело
      setValue('');

    } catch (error) {
      console.error('Error fetching deals:', error);
    }
  }

  async function deleteTask(dealId: string) {
    try {
      const res = await fetch(`https://6384b6a12c0a4af9.mokky.dev/items/${dealId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      setDeals(prevDeals => prevDeals.filter(deal => deal.id !== Number(dealId)));

    } catch (error) {
      console.error('Error deleting deal:', error);
    }
  }

  return (
    <>
      <h1>Deals List</h1>
      <div className='form'>
        <input value={value} onChange={e => setValue(e.target.value)} className='inputTask' type="text" placeholder='Добавить' />
        <button className='createTask' onClick={createTask}></button>
      </div>
      {deals?.length > 0 ? <List deals={deals} onDelete={deleteTask} /> : <h1>Список пуст :(</h1>}
    </>
  );
}

export default App;
