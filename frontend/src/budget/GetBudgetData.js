import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { doc, getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../auth/Auth";

function GetBudgetData({ category }) {
	const [budgetTotal, setBudgetTotal] = useState(0);
	const user = useAuth();

	useEffect(() => {
		if (!user) return;
		const fetchData = async () => {
			const userRef = await doc(db, "users", user.uid);
			const q = query(
				collection(userRef, "budgets"),
				where("category", "==", category)
			);

			try {
				const querySnapshot = await getDocs(q);
				let budget = 0;
				querySnapshot.forEach((doc) => {
					const data = doc.data();
					budget = parseInt(data.amount) || 0;
					// total += budget;
				});
				setBudgetTotal(budget);
			} catch (error) {
				console.error("Error getting budget data:", error);
			}
		};

		fetchData();
	}, [user, category]); // Re-run effect when category changes

	return (
		<Row>
			<p>/${budgetTotal}</p>
		</Row>
	);
}

export default GetBudgetData;
