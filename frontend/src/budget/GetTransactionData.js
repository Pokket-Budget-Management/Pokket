import React, { useEffect, useState } from "react";
import { Row, Alert } from "react-bootstrap";
import { doc, getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../auth/Auth";

function GetTransactionData({ category, budgetAmount }) {
	const [transactionTotal, setTransactionTotal] = useState(0);
	const user = useAuth();
	const alertThreshold = 0.8;

	useEffect(() => {
		if (!user) return;
		const fetchData = async () => {
			const userRef = await doc(db, "users", user.uid);
			const q = query(
				collection(userRef, "transactions"),
				where("category", "==", category)
			); // Updated collection name to 'transactions'

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
	}, [user, category]); // Re-run effect when category changes

	return (
		<Row>
			<p>
				${transactionTotal}
				<br />
				{`/$${budgetAmount}`}
			</p>
			{transactionTotal > alertThreshold * budgetAmount && (
				<Alert variant="warning" className="mt-2 text-center">
					Warning: Your transaction total is{" "}
					{Math.round(
						(parseFloat(transactionTotal) / parseFloat(budgetAmount)) * 100
					)}
					% of your budget amount.
				</Alert>
			)}
		</Row>
	);
}

export default GetTransactionData;
