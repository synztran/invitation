import Head from "next/head";
import { motion } from "framer-motion";
import { useState } from "react";
import LoginForm from "../components/loginForm";
import InvitationWrapper from "components/Wrapper/index";
import useCustomerStep from "hooks/useCustomerStep";
import BoardingPass from "components/BoardingPass";

type InvitationProps = {
	couple: string;
	date: string;
	venue: string;
};

export const invitorMap = {
	"111025nga": {
		name: "Ut Nga",
	},
	"111025mai": {
		name: "Má Mai",
	},
	"111025quanghuy": {
		name: "homie Quang Huy",
	},
};

export default function Home() {
	const { currentStep, stepData, nextStep, updateStepData, getStepProgress } =
		useCustomerStep();

	const handleAuthentication = (secret: string) => {
		updateStepData("login", {
			isAuthenticated: true,
			invitorInfo: invitorMap[secret as keyof typeof invitorMap],
		});
		nextStep({
			login: {
				isAuthenticated: true,
				invitorInfo: invitorMap[secret as keyof typeof invitorMap],
			},
		}); // Move to wrapper step
	};

	const handleProceedToBoardingPass = () => {
		updateStepData("wrapper", {
			viewedInvitation: true,
			timestamp: new Date(),
		});
		nextStep({
			wrapper: {
				viewedInvitation: true,
				timestamp: new Date(),
			},
		});
	};

	const renderCurrentStep = () => {
		switch (currentStep) {
			case "login":
				return <LoginForm onAuthenticated={handleAuthentication} />;

			case "wrapper":
				return (
					<InvitationWrapper onClick={handleProceedToBoardingPass} />
				);

			case "boarding-pass":
				return (
					<BoardingPass
						customerName={stepData.login?.invitorInfo.name || ""}
					/>
				);

			case "customer-reply":
				return (
					<div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
						<h2 className="text-2xl font-bold text-[var(--main-color)] mb-6 text-center">
							Will you join us?
						</h2>
						<div className="space-y-4">
							<motion.button
								onClick={() =>
									updateStepData("customerReply", {
										attending: true,
										submittedAt: new Date(),
									})
								}
								className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}>
								Yes, I'll be there! 🎉
							</motion.button>
							<motion.button
								onClick={() =>
									updateStepData("customerReply", {
										attending: false,
										submittedAt: new Date(),
									})
								}
								className="w-full bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}>
								Sorry, can't make it 😢
							</motion.button>
						</div>
						{stepData.customerReply?.attending !== null && (
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								className="mt-6 text-center text-green-600 font-semibold">
								Thank you for your response! 💕
							</motion.div>
						)}
					</div>
				);

			default:
				return <div>Unknown step</div>;
		}
	};
	return (
		<>
			<Head>
				<title>Wedding Invitation</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<meta
					name="description"
					content="You're invited to our special day"
				/>
			</Head>
			<div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
				<motion.div
					className="h-full bg-[var(--main-color)]"
					initial={{ width: "0%" }}
					animate={{ width: `${getStepProgress()}%` }}
					transition={{ duration: 0.3 }}
				/>
			</div>
			<main
				className={`p-4 ${
					currentStep === "boarding-pass"
						? "bg-transparent !p-0 rounded-3xl"
						: "bg-[url('/images/wrapper.webp')]"
				}`}>
				{renderCurrentStep()}
			</main>
		</>
	);
}
