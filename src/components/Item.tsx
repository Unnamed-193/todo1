import { useEffect, useRef, useState } from 'react';
import { DealApi } from '../pages/MainPage';
import './item.css';
import API_URL from '../api';
interface ItemProps {
  deal: DealApi;
  index: number;
  onDelete: (id: string) => void;
}

function Item({ deal, index, onDelete }: ItemProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    const resizeTextarea = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'; // Сбрасываем высоту перед изменением
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Устанавливаем новую высоту
      }
    };
    
    resizeTextarea(); // Вызываем при монтировании

    // Добавляем слушатель для изменения значения textarea
    const currentTextarea = textareaRef.current;
    if (currentTextarea) {
      currentTextarea.addEventListener('input', resizeTextarea);
    }
    
    return () => {
      if (currentTextarea) {
        currentTextarea.removeEventListener('input', resizeTextarea);
      }
    };
  }, [value]);

  // Handler for clicking the item
  const handleClick = async () => {
    const updatedActiveStatus = !isActive;
    setIsActive(updatedActiveStatus); // Toggle the state

    try {
      const res = await fetch(`${API_URL}/${deal.id}`, {
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
      const res = await fetch(`${API_URL}/${deal.id}`, {
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
    setValue(deal.deal);
  }, [deal]);

  return (
    <li className={`item ${isActive ? 'item--active' : ''}`}>
      <div className='text'>
        <strong className='item__id'>{index + 1}</strong>
        <textarea ref={textareaRef} className='item__text' value={value} onChange={handleInputChange} />
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
