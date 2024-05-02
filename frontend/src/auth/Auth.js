import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export function useAuth() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});
	}, []);

	return user;
}
