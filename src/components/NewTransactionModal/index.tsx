import { FormEvent, useState} from 'react';
import Modal from 'react-modal';
import { useTransactions } from '../../hooks/useTransactions';

import outcomeImg from '../../assets/saidas.svg';
import incomeImg from '../../assets/entradas.svg';
import closeImg from '../../assets/fechar.svg';

import { Container, RadioBox, TransactionTypeContainer } from './styles';


interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();
  
  const [type, setType] = useState('deposit');
  
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount: amount,
      category,
      type
    })

    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit');

    onRequestClose();
  }
  
  return(
        <Modal 
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className='react-modal-content'
        >
            <button type="button" onClick={onRequestClose} className='react-modal-close'>
                <img src={ closeImg } alt="Fechar"/>
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
            <h1>Cadastrar Transação</h1>

            <input 
              placeholder='Título' 
              value ={title}
              onChange={event => setTitle(event.target.value)}
            />

            <input 
              type='number'
              placeholder='Valor'
              value ={amount}
              onChange={event => setAmount(Number(event.target.value))}
            />

            <TransactionTypeContainer>
              <RadioBox
               type='button'
               onClick={() => { setType('deposit') }}
               isActive={type === 'deposit'}
               activeColor="green"
              >
                <img src={incomeImg} alt="Entrada" />
                <span>Entrada</span>
              </RadioBox>

              <RadioBox
               type='button'
               onClick={() => { setType('withdraw') }}
               isActive={type === 'withdraw'}
               activeColor="red"
              >
                <img src={outcomeImg} alt="Saída" />
                <span>Saída</span>
              </RadioBox>
            </TransactionTypeContainer>

            <input 
              placeholder='Categoria'
              value ={category}
              onChange={event => setCategory(event.target.value)}
            />

            <button type="submit">Cadastrar</button> 
            </Container>
            
            
        </Modal>
    );
}