import React, { useEffect, useState } from "react";
import { Row } from 'react-bootstrap';
import { doc, getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

function GetBudgetData({ category }) {
    const [budgetTotal, setBudgetTotal] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const auth = getAuth();
            const userRef = await doc(db, 'users', auth.currentUser.uid);
            const q = query(collection(userRef, 'budgets'), where("category", "==", category));
            
            try {
                const querySnapshot = await getDocs(q);
                let total = 0;
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const budget = parseInt(data.amount) || 0;
                    total += budget;
                });
                setBudgetTotal(total);
            } catch (error) {
                console.error("Error getting budget data:", error);
            }
        };

        fetchData();
    }, [category]); // Re-run effect when category changes

    return (
        <Row>
            <p>
                /${budgetTotal}
            </p>
        </Row>
    );
}

export default GetBudgetData;
