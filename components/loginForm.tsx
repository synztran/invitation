import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getInvitation } from "clients";

const formVariants = {
	initial: {
		opacity: 0,
		y: 40,
		scale: 0.97,
		boxShadow: "0 0 0px 0px #2A5F4D",
	},
	animate: {
		opacity: 1,
		y: 0,
		scale: 1,
		boxShadow: [
			"0 0 0px 0px #2A5F4D",
			"0 4px 32px 0px #2A5F4D33",
			"0 2px 16px 0px #2A5F4D22",
			"0 4px 32px 0px #2A5F4D33",
		],
		transition: {
			duration: 1,
			ease: "easeOut",
		},
	},
	exit: { opacity: 0, y: 24, scale: 0.97, transition: { duration: 0.5 } },
};

const inputVariants = {
	initial: { opacity: 0, x: 40 },
	animate: {
		opacity: 1,
		x: 0,
		transition: { delay: 0.3, duration: 0.7, type: "spring", bounce: 0.2 },
	},
};

// New button animation: subtle bounce-in, shine effect on hover, and a tap scale
const buttonVariants = {
	initial: { opacity: 1, y: 0, scale: 1 },
	animate: {
		opacity: 1,
		y: 0,
		scale: [1],
		transition: {
			delay: 0.7,
			duration: 0.5,
		},
	},
};

const shineVariants = {
	initial: { x: "-100%" },
	animate: { x: ["-100%", "120%"] },
	transition: {
		repeat: Infinity,
		repeatType: "loop",
		duration: 2.2,
		ease: "easeInOut",
		delay: 1.2,
	},
};

const errorVariants = {
	initial: { opacity: 0, y: 10 },
	animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
	exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
};

export default function LoginForm({
	onAuthenticated,
}: {
	onAuthenticated: (data: any) => void;
}) {
	const [secret, setSecret] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!secret.trim()) {
			setError("Secret key is required.");
			return;
		}

		setLoading(true);
		try {
			const response = await getInvitation(secret);
			if (response.status === "OK" && response.data.length > 0) {
				onAuthenticated(response.data[0]);
				setError("");
			} else {
				setError("Invalid secret key.");
			}
		} catch (error) {
			setError("Invalid secret key.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<AnimatePresence>
			<motion.div
				variants={formVariants}
				initial="initial"
				animate="animate"
				exit="exit"
				className="bg-white rounded-2xl shadow-lg p-4 w-full text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 !transform max-w-[90%] max-h-[90%] flex flex-col gap-4">
				{/* Sparkle animation top left */}
				<motion.span
					// variants={sparkleVariants}
					initial="initial"
					animate="animate"
					className="absolute left-4 top-4 w-8 h-8 pointer-events-none z-10">
					<span className="block w-full h-full bg-[var(--main-color)]/20 rounded-full blur-lg opacity-70" />
				</motion.span>
				{/* Sparkle animation bottom right */}
				<motion.span
					// variants={sparkleVariants}
					initial="initial"
					animate="animate"
					className="absolute right-4 bottom-4 w-8 h-8 pointer-events-none z-10"
					style={{ animationDelay: "1.1s" }}>
					<span className="block w-full h-full bg-[var(--main-color)]/20 rounded-full blur-lg opacity-70" />
				</motion.span>
				<motion.h2
					className="text-2xl font-bold text-[var(--main-color)]"
					initial={{ scale: 0.98, opacity: 0, y: -20 }}
					animate={{ scale: 1, opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}>
					Thanks for coming here !
				</motion.h2>
				<motion.form
					onSubmit={handleSubmit}
					className="space-y-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2, duration: 0.7 }}>
					<motion.div
						variants={inputVariants}
						initial="initial"
						animate="animate">
						<motion.input
							type="text"
							placeholder="Fill your invitation key"
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]"
							value={secret}
							onChange={(e: any) => setSecret(e.target.value)}
							autoComplete="off"
							autoCorrect="off"
							initial={{ opacity: 0, x: 40 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{
								delay: 0.3,
								duration: 0.7,
								type: "spring",
								bounce: 0.2,
							}}
						/>
					</motion.div>
					<AnimatePresence>
						{error && (
							<motion.div
								className="text-red-500 text-sm"
								variants={errorVariants}
								initial="initial"
								animate="animate"
								exit="exit"
								key="error">
								{error}
							</motion.div>
						)}
					</AnimatePresence>
					<motion.button
						type="submit"
						className={`w-full font-semibold py-2 rounded-lg hover:opacity-90 transition relative overflow-hidden ${
							error
								? "bg-red-500 text-white"
								: "bg-[var(--main-color)] text-white"
						}`}
						variants={buttonVariants}
						initial="initial"
						whileTap={error ? { scale: 0.98 } : {}}
						// Add shake animation when error
						animate={
							error
								? {
										x: [
											0, -10, 10, -10, 10, -4, 4, -2, 2,
											0,
										],
										transition: {
											duration: 0.5,
											type: "spring",
										},
								  }
								: { x: 0 }
						}>
						{/* Animated shine effect */}
						<motion.span
							className="absolute left-0 top-0 w-full h-full pointer-events-none"
							initial="initial"
							animate="animate"
							variants={shineVariants}>
							<div className="block w-16 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent blur-md opacity-80" />
						</motion.span>
						<span className="relative z-10">
							{isLoading ? (
								<div className="flex items-center justify-center">
									<svg
										className="animate-spin h-5 w-5 text-white mr-2"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24">
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
									</svg>
								</div>
							) : (
								"Get your boarding pass"
							)}
						</span>
					</motion.button>
				</motion.form>
			</motion.div>
		</AnimatePresence>
	);
}
