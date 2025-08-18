# useCustomerStep Hook Usage Guide

## The Problem You Were Experiencing

The state wasn't updating because of **React's asynchronous state updates**. When you called:

```typescript
updateStepData("login", { isAuthenticated: true });
nextStep(); // ❌ This used old stepData because setState is async
```

The `nextStep()` function was checking the old `stepData` before the update had taken effect.

## ✅ Fixed Solutions

### Option 1: Use the new `updateStepDataAndProceed` function

```typescript
const { updateStepDataAndProceed } = useCustomerStep();

// This handles both update and navigation in one call
const handleAuthentication = () => {
	updateStepDataAndProceed("login", { isAuthenticated: true });
};
```

### Option 2: Pass the updated data directly to `nextStep`

```typescript
const { nextStep } = useCustomerStep();

const handleAuthentication = () => {
	const updatedData = {
		login: { isAuthenticated: true },
	};
	nextStep(updatedData); // Pass the new data directly
};
```

### Option 3: Use the callback parameter (if you need custom logic)

```typescript
const { updateStepData, nextStep } = useCustomerStep();

const handleAuthentication = () => {
	updateStepData("login", { isAuthenticated: true }, () => {
		// This callback runs after the state update
		nextStep();
	});
};
```

## Complete Usage Example

```typescript
import { useCustomerStep } from "./useCustomerStep";

function MyComponent() {
	const { currentStep, stepData, updateStepDataAndProceed, nextStep } =
		useCustomerStep();

	// ✅ Recommended: Use updateStepDataAndProceed
	const handleLogin = () => {
		updateStepDataAndProceed("login", {
			isAuthenticated: true,
			secretKey: "user-key",
		});
	};

	// ✅ Alternative: Pass data to nextStep
	const handleWrapperComplete = () => {
		nextStep({
			wrapper: {
				viewedInvitation: true,
				timestamp: new Date(),
			},
		});
	};

	return (
		<div>
			<p>Current Step: {currentStep}</p>
			<p>
				Is Authenticated:{" "}
				{stepData.login?.isAuthenticated ? "Yes" : "No"}
			</p>

			{currentStep === "login" && (
				<button onClick={handleLogin}>Login</button>
			)}

			{currentStep === "wrapper" && (
				<button onClick={handleWrapperComplete}>Continue</button>
			)}
		</div>
	);
}
```

## Key Changes Made

1. **Fixed function signature**: `nextStep` now accepts optional `CustomerStepData`
2. **Added `updateStepDataAndProceed`**: Combines update and navigation in one atomic operation
3. **Fixed dependency arrays**: Proper dependencies to prevent stale closures
4. **Simplified state logic**: Cleaner, more predictable state updates

The hook now properly handles React's asynchronous state updates and provides multiple ways to update data and navigate between steps reliably.
