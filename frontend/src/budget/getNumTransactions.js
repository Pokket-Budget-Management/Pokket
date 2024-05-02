import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { doc, getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../auth/Auth";

function GetNumTransactions({ category }) {
	const [documentCount, setDocumentCount] = useState(0);
	const user = useAuth();

	useEffect(() => {
		if (!user) return;
		const fetchData = async () => {
			const userRef = doc(db, "users", user.uid);
			const q = query(
				collection(userRef, "transactions"),
				where("category", "==", category)
			);

			try {
				const querySnapshot = await getDocs(q);
				setDocumentCount(querySnapshot.size);
			} catch (error) {
				console.error("Error getting transactions data:", error);
			}
		};

		fetchData();
	}, [user, category]); // Re-run effect when category changes

	return (
		<Row>
			<p className="mb-0">{documentCount} Transactions</p>
		</Row>
	);
}

export default GetNumTransactions;
