import React, { useEffect, useState } from "react";
import { Row } from 'react-bootstrap';
import { doc, getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

function GetNumTransactions({ category }) {
    const [documentCount, setDocumentCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const auth = getAuth();
            const userRef = doc(db, 'users', auth.currentUser.uid);
            const q = query(collection(userRef, 'budgets'), where("category", "==", category));
            
            try {
                const querySnapshot = await getDocs(q);
                setDocumentCount(querySnapshot.size);
            } catch (error) {
                console.error("Error getting budget data:", error);
            }
        };

        fetchData();
    }, [category]); // Re-run effect when category changes

    return (
        <Row>
            <p className="mb-0">
                {documentCount} Transactions
            </p>
        </Row>
    );
}

export default GetNumTransactions;
