import Head from "next/head";
import { motion } from "framer-motion";
import { useCustomerStep } from "../hooks/useCustomerStep";
import LoginForm from "../components/loginForm";
import InvitationWrapper from "../components/Wrapper/index";

// This is an example of how to integrate the useCustomerStep hook
// into your existing pages/index.tsx file

export default function Home() {
	const { currentStep, stepData, nextStep, updateStepData, getStepProgress } =
		useCustomerStep();

	// Handle login authentication
	const handleAuthentication = () => {
		updateStepData("login", {
			isAuthenticated: true,
		});
		nextStep({
			login: {
				isAuthenticated: true,
				invitorInfo: {
					name: "Trần Anh Quân",
					invitation_id: "1234567890",
				},
				isSubmittedForm: false,
			},
		}); // Move to wrapper step
	};

	// Handle when user has viewed the invitation and wants to proceed
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
					<div className="relative h-full">
						<InvitationWrapper
							onClick={handleProceedToBoardingPass}
						/>
						{/* Add a floating button to proceed */}
						<motion.button
							onClick={handleProceedToBoardingPass}
							className="absolute bottom-8 right-8 bg-[var(--main-color)] text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 2 }} // Show after invitation animation
						>
							Get Boarding Pass →
						</motion.button>
					</div>
				);

			case "boarding-pass":
				return (
					<div className="text-center text-white">
						<h2 className="text-3xl font-bold mb-4">
							Your Boarding Pass
						</h2>
						<p className="mb-8">
							Here's your special boarding pass for our wedding!
						</p>
						{/* Add your boarding pass component here */}
						<motion.button
							onClick={() => {
								updateStepData("boardingPass", {
									timestamp: new Date(),
								});
								nextStep({
									boardingPass: {
										timestamp: new Date(),
									},
								});
							}}
							className="bg-white text-[var(--main-color)] px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}>
							Proceed to RSVP
						</motion.button>
					</div>
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
										timestamp: new Date(),
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
										timestamp: new Date(),
									})
								}
								className="w-full bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}>
								Sorry, can't make it 😢
							</motion.button>
						</div>
						{stepData.customerReply?.timestamp !== undefined && (
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

			{/* Progress indicator */}
			<div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
				<motion.div
					className="h-full bg-[var(--main-color)]"
					initial={{ width: "0%" }}
					animate={{ width: `${getStepProgress()}%` }}
					transition={{ duration: 0.3 }}
				/>
			</div>

			<main className="h-screen w-screen relative bg-[url('/images/wrapper.webp')] bg-cover p-8 overflow-hidden">
				{renderCurrentStep()}
			</main>
		</>
	);
}
