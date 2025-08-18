import { useState, useCallback, useRef, useEffect } from "react";

export type CustomerStep =
	| "login"
	| "wrapper"
	| "boarding-pass"
	| "customer-reply";

export interface CustomerStepData {
	login?: {
		isAuthenticated: boolean;
		secretKey?: string;
	};
	wrapper?: {
		viewedInvitation: boolean;
		timestamp?: Date;
	};
	boardingPass?: {
		passGenerated: boolean;
		passData?: any;
	};
	customerReply?: {
		attending: boolean | null;
		guestCount?: number;
		dietaryRestrictions?: string;
		message?: string;
		submittedAt?: Date;
		name?: string;
	};
}

export interface UseCustomerStepReturn {
	// Current step state
	currentStep: CustomerStep;
	stepIndex: number;
	stepData: CustomerStepData;

	// Navigation functions
	nextStep: (updatedData?: CustomerStepData) => void;
	previousStep: () => void;
	goToStep: (step: CustomerStep) => void;

	// Step validation
	canProceedToNext: () => boolean;
	canGoToPrevious: () => boolean;
	isStepCompleted: (step: CustomerStep) => boolean;

	// Data management
	updateStepData: <K extends keyof CustomerStepData>(
		step: K,
		data: Partial<CustomerStepData[K]>,
		callback?: () => void
	) => void;
	updateStepDataAndProceed: <K extends keyof CustomerStepData>(
		step: K,
		data: Partial<CustomerStepData[K]>
	) => void;
	resetFlow: () => void;

	// Utility functions
	getStepProgress: () => number;
	getAllSteps: () => CustomerStep[];
}

const STEPS: CustomerStep[] = [
	"login",
	"wrapper",
	"boarding-pass",
	"customer-reply",
];

const INITIAL_STEP_DATA: CustomerStepData = {
	login: {
		isAuthenticated: false,
	},
	wrapper: {
		viewedInvitation: false,
	},
	boardingPass: {
		passGenerated: false,
	},
	customerReply: {
		attending: null,
	},
};

export const useCustomerStep = (
	initialStep: CustomerStep = "login"
): UseCustomerStepReturn => {
	const [currentStep, setCurrentStep] = useState<CustomerStep>(initialStep);
	const [stepData, setStepData] =
		useState<CustomerStepData>(INITIAL_STEP_DATA);

	// To allow a callback after state update (since setState is async)
	const pendingCallback = useRef<(() => void) | null>(null);

	// Data management
	const updateStepData = <K extends keyof CustomerStepData>(
		step: K,
		data: Partial<CustomerStepData[K]>,
		callback?: () => void
	) => {
		setStepData((prev) => ({
			...prev,
			[step]: {
				...(prev[step] ?? {}),
				...data,
			},
		}));
		if (callback) {
			pendingCallback.current = callback;
		}
	};

	useEffect(() => {
		if (pendingCallback.current) {
			pendingCallback.current();
			pendingCallback.current = null;
		}
	}, [stepData]);

	// Step validation
	const isStepCompleted = useCallback(
		(step: CustomerStep, updatedData?: CustomerStepData): boolean => {
			const dataToCheck = updatedData || stepData;
			switch (step) {
				case "login":
					return dataToCheck.login?.isAuthenticated === true;
				case "wrapper":
					return dataToCheck.wrapper?.viewedInvitation === true;
				case "boarding-pass":
					return dataToCheck.boardingPass?.passGenerated === true;
				case "customer-reply":
					return dataToCheck.customerReply?.attending !== null;
				default:
					return false;
			}
		},
		[stepData]
	);

	// Always compute stepIndex from currentStep
	const stepIndex = STEPS.findIndex((step) => step === currentStep);

	// Navigation functions
	const nextStep = useCallback(
		(updatedData?: CustomerStepData) => {
			const currentIndex = STEPS.findIndex(
				(step) => step === currentStep
			);

			// Use provided data or current stepData
			const dataToCheck = updatedData || stepData;

			if (
				currentIndex < STEPS.length - 1 &&
				isStepCompleted(currentStep, dataToCheck)
			) {
				setCurrentStep(STEPS[currentIndex + 1]);
			}
		},
		[currentStep, stepData, isStepCompleted]
	);

	const previousStep = useCallback(() => {
		const currentIndex = STEPS.findIndex((step) => step === currentStep);
		if (currentIndex > 0) {
			setCurrentStep(STEPS[currentIndex - 1]);
		}
	}, [currentStep]);

	const goToStep = useCallback(
		(step: CustomerStep) => {
			const targetIndex = STEPS.findIndex((s) => s === step);
			const currentIndex = STEPS.findIndex((s) => s === currentStep);

			// Allow going backwards or to the next step if current step is completed
			if (targetIndex <= currentIndex || isStepCompleted(currentStep)) {
				setCurrentStep(step);
			}
		},
		[currentStep, isStepCompleted]
	);

	const canProceedToNext = useCallback((): boolean => {
		return isStepCompleted(currentStep);
	}, [currentStep, stepData, isStepCompleted]);

	const canGoToPrevious = useCallback((): boolean => {
		return stepIndex > 0;
	}, [stepIndex]);

	// Helper function to update data and proceed in one call
	const updateStepDataAndProceed = useCallback(
		<K extends keyof CustomerStepData>(
			step: K,
			data: Partial<CustomerStepData[K]>
		) => {
			const newStepData = {
				...stepData,
				[step]: {
					...(stepData[step] ?? {}),
					...data,
				},
			};
			setStepData(newStepData);
			nextStep(newStepData);
		},
		[stepData, nextStep]
	);

	const resetFlow = useCallback(() => {
		setCurrentStep("login");
		setStepData(INITIAL_STEP_DATA);
	}, []);

	// Utility functions
	const getStepProgress = useCallback((): number => {
		return ((stepIndex + 1) / STEPS.length) * 100;
	}, [stepIndex]);

	const getAllSteps = useCallback((): CustomerStep[] => {
		return [...STEPS];
	}, []);

	return {
		// Current step state
		currentStep,
		stepIndex,
		stepData,

		// Navigation functions
		nextStep,
		previousStep,
		goToStep,

		// Step validation
		canProceedToNext,
		canGoToPrevious,
		isStepCompleted,

		// Data management
		updateStepData,
		updateStepDataAndProceed,
		resetFlow,

		// Utility functions
		getStepProgress,
		getAllSteps,
	};
};

export default useCustomerStep;
