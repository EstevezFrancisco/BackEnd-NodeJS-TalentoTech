import { db } from "./firebase.model.js";
import { collection, doc, getDoc, getDocs, addDoc, deleteDoc, updateDoc, query, where } from "firebase/firestore";

const productsRef = collection(db, "products");



export const getProducts = async () => {
    try {
        const snapshot = await getDocs(productsRef);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error(error);
    }
};


export const filterProducts = async (filter) => {
    try {
        let q = query(productsRef);

        if (filter.min_price) {
            q = query(q, where("price", ">=", parseFloat(filter.min_price)));
        }

        if (filter.max_price) {
            q = query(q, where("price", "<=", parseFloat(filter.max_price)));
        }

        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error(error);
    }
};


export const createProduct = async (productData) => {
    try {
        const prodRef = await addDoc(productsRef, productData);
        return { id: prodRef.id, ...productData };
    } catch (error) {
        console.error(error);
    }
};


export const getProductById = async (id) => {
    try {
        const productRef = doc(productsRef, id);
        const snapshot = await getDoc(productRef);
        if (!snapshot.exists()) return null;
        return { id: snapshot.id, ...snapshot.data() };
    } catch (error) {
        console.error(error);
    }
};


export const updateProductById = async (id, productData) => {
    try {
        const productRef = doc(productsRef, id);
        const snapshot = await getDoc(productRef);
        if (!snapshot.exists()) return null;

        await updateDoc(productRef, productData);
        return { id, ...productData };
    } catch (error) {
        console.error(error);
    }
};


export const deleteProductById = async (id) => {
    try {
        const productRef = doc(productsRef, id);
        const snapshot = await getDoc(productRef);
        if (!snapshot.exists()) return false;

        await deleteDoc(productRef);
        return true;
    } catch (error) {
        console.error(error);
    }
};
