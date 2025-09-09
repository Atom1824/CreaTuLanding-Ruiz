import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

const ORDERS_COLLECTION = 'orders';

// Create new order
export const createOrder = async (orderData) => {
  try {
    const order = {
      ...orderData,
      createdAt: serverTimestamp(),
      status: 'pending'
    };
    
    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), order);
    return docRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Get orders by user email
export const getOrdersByUser = async (userEmail) => {
  try {
    const q = query(
      collection(db, ORDERS_COLLECTION),
      where('customerEmail', '==', userEmail),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return orders;
  } catch (error) {
    console.error('Error getting orders:', error);
    throw error;
  }
};