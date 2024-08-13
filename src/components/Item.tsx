import { useEffect, useState } from 'react';
import { DealApi } from '../App';
import './item.css'
interface ItemProps {
  deal: DealApi;
  onDelete: (id: string) => void;
}

function Item({ deal, onDelete }: ItemProps) {
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState<string>('')

  // Handler for clicking the item
  const handleClick = async () => {
    const updatedActiveStatus = !isActive;
    setIsActive(updatedActiveStatus); // Toggle the state

    try {
      const res = await fetch(`https://6384b6a12c0a4af9.mokky.dev/items/${deal.id}`, {
        method: 'PATCH', // Assuming your API support updating deals with PUT
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...deal, isActive: updatedActiveStatus }), // Update the isActive state
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      // Optionally, handle the update response here if needed
    } catch (error) {
      console.error('Error updating deal:', error);
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue); // Update local state

    try {
      const res = await fetch(`https://6384b6a12c0a4af9.mokky.dev/items/${deal.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...deal, deal: newValue }), // Update the deal text
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      // Optionally, handle the update response here if needed
    } catch (error) {
      console.error('Error updating deal text:', error);
    }
  };

  useEffect(() => {
    setIsActive(deal.isActive);
    setValue(deal.deal)
  }, [deal]);


  return (
    <li className={`item ${isActive ? 'item--active' : ''}`}>
      <div className='text'>
        <strong className='item__id'>{deal.id}</strong>
        <textarea className='item__text' value={value} onChange={handleInputChange}   />
      </div>
      <div className='btns'>
        <button className='done' onClick={handleClick}>
        {isActive ? 'Undone' : 'Done'}
        </button>
        <button className='item__delete' onClick={() => onDelete(deal.id.toString())}></button>
      </div>
    </li>
  );
}

export default Item;
