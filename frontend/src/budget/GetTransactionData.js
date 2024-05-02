import React, { useEffect, useState } from "react";
import { Row } from 'react-bootstrap';
import { doc, getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

function GetTransactionData({ category }) {
    const [transactionTotal, setTransactionTotal] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const auth = getAuth();
            const userRef = await doc(db, 'users', auth.currentUser.uid);
            const q = query(collection(userRef, 'transactions'), where("category", "==", category)); // Updated collection name to 'transactions'
            
            try {
                const querySnapshot = await getDocs(q);
                let total = 0;
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const trans = parseInt(data.amount) || 0;
                    total += trans;
                });
                setTransactionTotal(total);
            } catch (error) {
                console.error("Error getting budget data:", error);
            }
        };

        fetchData();
    }, [category]); // Re-run effect when category changes

    return (
        <Row>
            <p>
                ${transactionTotal}
            </p>
        </Row>
    );
}

export default GetTransactionData;
