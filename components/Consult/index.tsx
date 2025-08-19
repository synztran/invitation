import { putInvitation } from "clients";
import { GOOGLE_MAPS_ICON, PATTERN_WEDDING } from "components/images";
import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThanksModal from "components/Thanks";

interface ConsultFormProps {
	onSubmit?: () => void;
	initialData?: {
		attending?: boolean | null;
		printInvitation?: boolean | null;
		withSomeone?: boolean | null;
		notice?: string;
		phone?: string;
	};
	invitationId: string;
	customerName: string;
}

const MAPS_LINK = "https://maps.app.goo.gl/bGWkiUMKRnepueQH9";

// Fancy radio button component with animation
const FancyRadio = ({
	name,
	checked,
	onChange,
	label,
}: {
	name: string;
	checked: boolean;
	onChange: () => void;
	label: string;
}) => (
	<motion.label
		className="flex items-center cursor-pointer select-none gap-2 w-1/2"
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ type: "spring", stiffness: 300, damping: 24 }}
		whileHover={{ scale: 1.05 }}>
		<span className="relative flex items-center">
			<input
				type="radio"
				name={name}
				checked={checked}
				onChange={onChange}
				className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-full checked:border-[var(--sub-main-color)] checked:bg-[var(--sub-main-color)] transition-colors duration-200 outline-none focus:ring-2 focus:ring-[var(--sub-main-color)]"
			/>
			<span className="absolute left-0 top-0 w-5 h-5 rounded-full border-2 border-gray-300 pointer-events-none"></span>
			<span
				className={`absolute left-1 top-1 w-3 h-3 rounded-full bg-white pointer-events-none transition-all duration-200 ${
					checked ? "bg-white" : "bg-transparent"
				}`}></span>
			<motion.span
				className={`absolute left-1 top-1 w-3 h-3 rounded-full pointer-events-none transition-all duration-200 ${
					checked ? "bg-[var(--main-color)]" : "bg-transparent"
				}`}
				animate={
					checked
						? { scale: [0.7, 1.2, 1], opacity: [0.5, 1, 1] }
						: { scale: 0.7, opacity: 0.5 }
				}
				transition={{ duration: 0.3 }}></motion.span>
		</span>
		<span className="ml-2">{label}</span>
	</motion.label>
);

const fadeInUp = {
	hidden: { opacity: 0, y: 30 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: 0.1 * i,
			type: "spring",
			stiffness: 300,
			damping: 24,
		},
	}),
};

const ConsultForm: React.FC<ConsultFormProps> = ({
	onSubmit,
	initialData,
	invitationId,
	customerName,
}) => {
	const [attending, setAttending] = useState<boolean | null>(
		initialData?.attending ?? true
	);
	const [printInvitation, setPrintInvitation] = useState<boolean | null>(
		initialData?.printInvitation ?? true
	);
	const [withSomeone, setWithSomeone] = useState<boolean | null>(
		initialData?.withSomeone ?? true
	);
	const [notice, setNotice] = useState<string>(initialData?.notice ?? "");
	const [phone, setPhone] = useState<string>(initialData?.phone ?? "");
	const [submitted, setSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitted(true);
		if (!invitationId) {
			return;
		}
		setIsSubmitting(true);

		try {
			const data = {
				is_join: attending,
				is_print: printInvitation,
				go_with: withSomeone,
				note: notice,
				phone,
				invitation_id: invitationId,
			};
			const response = await putInvitation(data);
			if (response.status === "OK") {
				setShowSuccess(true);
				// setTimeout(() => {
				// 	setShowSuccess(false);
				// 	if (onSubmit) {
				// 		onSubmit();
				// 	}
				// }, 1200);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<motion.div
			className="flex flex-col items-center justify-center h-full gap-2"
			initial={{ opacity: 0, scale: 0.97, y: 40 }}
			animate={{ opacity: 1, scale: 1, y: 0 }}
			transition={{ duration: 0.8, ease: "easeOut" }}>
			<motion.div
				className="w-full h-full relative"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2, duration: 0.7 }}>
				<Image
					src={PATTERN_WEDDING}
					alt="Pattern"
					objectFit="fill"
					layout="fill"
					className="rounded-lg "
				/>
			</motion.div>
			<motion.form
				className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-6 relative z-10"
				onSubmit={handleSubmit}
				initial={{ opacity: 0, y: 40, scale: 0.97 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{
					delay: 0.3,
					duration: 0.7,
					type: "spring",
					stiffness: 200,
				}}>
				{/* Google Maps Direction Link */}
				<motion.div
					className="flex flex-col items-center"
					variants={fadeInUp}
					initial="hidden"
					animate="visible"
					custom={0}>
					<motion.a
						href={MAPS_LINK}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-lg"
						style={{ textDecoration: "none" }}
						whileHover={{
							scale: 1.07,
							boxShadow: "0 4px 24px #3b82f6aa",
						}}
						whileTap={{ scale: 0.97 }}>
						<motion.div
							initial={{ rotate: -10, scale: 0.8 }}
							animate={{ rotate: 0, scale: 1 }}
							transition={{
								type: "spring",
								stiffness: 300,
								damping: 20,
							}}>
							<Image
								src={GOOGLE_MAPS_ICON}
								alt="Location"
								width={30}
								height={30}
							/>
						</motion.div>
						<motion.div
							className="text-xl"
							style={{ lineHeight: 1 }}
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.2, duration: 0.5 }}>
							Get Directions
						</motion.div>
					</motion.a>
					<motion.span
						className="text-xs text-gray-500 mt-1 text-center"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5, duration: 0.5 }}>
						Click to open Google Maps for the event location
					</motion.span>
				</motion.div>
				<motion.div
					variants={fadeInUp}
					initial="hidden"
					animate="visible"
					custom={1}>
					<label className="block font-semibold mb-2">
						Will you join party with us?
					</label>
					<motion.div className="flex gap-4">
						<FancyRadio
							name="attending"
							checked={attending === true}
							onChange={() => setAttending(true)}
							label="Yes, I'll be there"
						/>
						<FancyRadio
							name="attending"
							checked={attending === false}
							onChange={() => setAttending(false)}
							label="Sorry, I got busy"
						/>
					</motion.div>
					<AnimatePresence>
						{submitted && attending === null && (
							<motion.div
								className="text-red-500 text-sm mt-1"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 10 }}
								transition={{ duration: 0.3 }}>
								Please select an option.
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>

				<motion.div
					variants={fadeInUp}
					initial="hidden"
					animate="visible"
					custom={2}>
					<label className="block font-semibold mb-2">
						Will you help us on go to the bride's house (Bê tráp)?
					</label>
					<motion.div className="flex gap-4">
						<FancyRadio
							name="printInvitation"
							checked={printInvitation === true}
							onChange={() => setPrintInvitation(true)}
							label="Yes of course"
						/>
						<FancyRadio
							name="printInvitation"
							checked={printInvitation === false}
							onChange={() => setPrintInvitation(false)}
							label="Nah, I don't need it"
						/>
					</motion.div>
				</motion.div>

				<motion.div
					variants={fadeInUp}
					initial="hidden"
					animate="visible"
					custom={3}>
					<label className="block font-semibold mb-2">
						Will you go with someone?
					</label>
					<motion.div className="flex gap-4">
						<FancyRadio
							name="withSomeone"
							checked={withSomeone === true}
							onChange={() => setWithSomeone(true)}
							label="Yes"
						/>
						<FancyRadio
							name="withSomeone"
							checked={withSomeone === false}
							onChange={() => setWithSomeone(false)}
							label="Nah"
						/>
					</motion.div>
				</motion.div>

				<motion.div
					variants={fadeInUp}
					initial="hidden"
					animate="visible"
					custom={4}>
					<label
						className="block font-semibold mb-2"
						htmlFor="notice">
						Your notice
					</label>
					<motion.textarea
						id="notice"
						className="w-full border rounded px-3 py-2"
						value={notice}
						onChange={(e) => setNotice(e.target.value)}
						rows={3}
						placeholder="Any message or note for us, food, etc?"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1, duration: 0.4 }}
					/>
				</motion.div>

				<motion.div
					variants={fadeInUp}
					initial="hidden"
					animate="visible"
					custom={5}>
					<label className="block font-semibold mb-2" htmlFor="phone">
						Your phone
					</label>
					<motion.input
						id="phone"
						type="tel"
						className="w-full border rounded px-3 py-2"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						placeholder="Enter your phone number"
						autoComplete="off"
						required
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.15, duration: 0.4 }}
					/>
					<AnimatePresence>
						{submitted && !phone && (
							<motion.div
								className="text-red-500 text-sm mt-1"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 10 }}
								transition={{ duration: 0.3 }}>
								Phone is required.
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>

				<motion.button
					type="submit"
					className="w-full bg-[var(--main-color)] text-white py-2 rounded hover:bg-opacity-90 transition font-bold shadow-lg relative overflow-hidden"
					whileHover={{
						scale: 1.03,
						boxShadow: "0 4px 24px #eab30855",
						backgroundColor: "var(--main-color)",
					}}
					whileTap={{ scale: 0.97 }}
					disabled={isSubmitting}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.5 }}>
					{isSubmitting ? (
						<motion.span
							className="flex items-center justify-center gap-2"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}>
							<motion.span
								className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
								style={{ borderTopColor: "transparent" }}
							/>
							Submitting...
						</motion.span>
					) : (
						"Submit"
					)}
				</motion.button>
				<style jsx>{`
					/* Extra style for fancy radio if needed */
					input[type="radio"].peer:checked + span {
						border-color: var(--main-color);
						background: var(--main-color);
					}
					@keyframes spin {
						to {
							transform: rotate(360deg);
						}
					}
					.animate-spin {
						animation: spin 0.8s linear infinite;
					}
				`}</style>
			</motion.form>
			<ThanksModal
				open={showSuccess}
				onBackToLogin={() => {
					onSubmit?.();
					// window.location.reload();
				}}
				customerName={customerName}
			/>
		</motion.div>
	);
};

export default ConsultForm;
