import Head from "next/head";
import { motion } from "framer-motion";
import { useState } from "react";
import LoginForm from "../components/loginForm";
import InvitationWrapper from "components/Wrapper/index";
import useCustomerStep from "hooks/useCustomerStep";
import BoardingPass from "components/BoardingPass";
import ConsultForm from "components/Consult";

export default function Home() {
	const {
		currentStep,
		stepData,
		nextStep,
		updateStepData,
		getStepProgress,
		goToStep,
	} = useCustomerStep();

	const handleAuthentication = (data: any) => {
		updateStepData("login", {
			isAuthenticated: true,
			invitorInfo: data,
			isSubmittedForm: data?.updated_at !== "",
		});
		nextStep({
			login: {
				isAuthenticated: true,
				invitorInfo: data,
				isSubmittedForm: data?.updated_at !== "",
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

	const handleProceedToConsult = () => {
		updateStepData("boardingPass", {
			timestamp: new Date(),
		});
		nextStep({
			boardingPass: {
				timestamp: new Date(),
			},
		});
	};

	const handleSubmitConsult = () => {
		updateStepData("customerReply", {
			timestamp: new Date(),
		});
		goToStep("login");
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
						onTear={handleProceedToConsult}
						isSubmittedForm={
							stepData.login?.isSubmittedForm || false
						}
					/>
				);

			case "customer-reply":
				return (
					<ConsultForm
						onSubmit={handleSubmitConsult}
						invitationId={
							stepData.login?.invitorInfo.invitation_id || ""
						}
						customerName={stepData.login?.invitorInfo.name || ""}
					/>
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
				} ${currentStep === "customer-reply" ? "my-auto" : ""}`}>
				{renderCurrentStep()}
			</main>
		</>
	);
}
