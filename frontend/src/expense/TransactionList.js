import { Table } from "react-bootstrap";
import "./TransactionList.css";

const TransactionList = () => {
	const transactions = [
		{
			date: "3/7/2024",
			description: "Something, Inc",
			category: "Subscription",
			amount: "5.99",
		},
		{
			date: "3/7/2024",
			description: "Spotify",
			category: "Subscription",
			amount: "123.95",
		},
		{
			date: "3/7/2024",
			description: "Ralph's",
			category: "Grocery",
			amount: "50.00",
		},
	];

	return (
		<div className="container">
			<h1 className="my-4">
				Categorize your transactions to <br /> manage your finances effectively
			</h1>
			<Table bordered hover>
				<thead>
					<tr>
						<th>Transaction</th>
						<th>Amount</th>
						<th>Category</th>
					</tr>
				</thead>
				<tbody>
					{transactions.map((transaction, index) => (
						<tr key={index}>
							<td>
								<div>
									<p>{transaction.description}</p>
									<p>{transaction.date}</p>
								</div>
							</td>
							<td>{transaction.amount}</td>
							<td>{transaction.category}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default TransactionList;
