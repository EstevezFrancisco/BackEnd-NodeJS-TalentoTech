import { db } from "./firebase.model.js";
import { collection, doc, getDoc, getDocs, addDoc, deleteDoc, updateDoc } from "firebase/firestore";

const products = collection(db, "products");

export const getAllProducts = async () => {
    try {
        const snapshot = await getDocs(products);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error(error);
    }
};


export const getProductById = async (id) => {
    try {
        const productRef = doc(products, id);
        const snapshot = await getDoc(productRef);
        if (!snapshot.exists()) return null;
        return { id: snapshot.id, ...snapshot.data() };
    } catch (error) {
        console.error(error);
    }
};


export const createProduct = async (productData) => {
    try {
        const prodRef = await addDoc(products, productData);
        return { id: prodRef.id, ...productData };
    } catch (error) {
        console.error(error);
    }
};


export const deleteProductById = async (id) => {
    try {
        const productRef = doc(products, id);
        const snapshot = await getDoc(productRef);
        if (!snapshot.exists()) return false;

        await deleteDoc(productRef);
        return true;
    } catch (error) {
        console.error(error);
    }
};


export const updateProductById = async (id, productData) => {
    try {
        const productRef = doc(products, id);
        const snapshot = await getDoc(productRef);
        if (!snapshot.exists()) return null;

        const currentData = snapshot.data();
        const mergedData = { ...currentData, ...productData };

        await updateDoc(productRef, mergedData);
        return { id, ...mergedData };
    } catch (error) {
        console.error(error);
    }
};