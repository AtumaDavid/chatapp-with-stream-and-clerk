import { env } from "@/env";
import { getReadyServiceWorker } from "@/utils/serviceWorker";

export async function getCurrentPushSubscription(): Promise<PushSubscription | null> {
  const sw = await getReadyServiceWorker();
  return sw.pushManager.getSubscription();
}

export async function registerPushNotifications() {
  // Check if the browser supports PushManager
  if (!("PushManager" in window)) {
    throw Error("Push notifications are not supported by this browser");
  }

  // Check if there is an existing push notification subscription
  const existingSubscription = await getCurrentPushSubscription();

  // If an existing subscription is found, throw an error
  if (existingSubscription) {
    throw Error("Existing push subscription found");
  }

  const sw = await getReadyServiceWorker();

  const subscription = await sw.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
  });

  await sendPushSubscriptionToServer(subscription);
}

// Function to unregister push notifications
export async function unregisterPushNotifications() {
  // Check if there is an existing push notification subscription
  const existingSubscription = await getCurrentPushSubscription();

  // If no existing subscription is found, throw an error
  if (!existingSubscription) {
    throw Error("No existing push subscription found");
  }

  // Delete the push subscription from the server
  await deletePushSubscriptionFromServer(existingSubscription);

  // Unsubscribe the user from push notifications
  await existingSubscription.unsubscribe();
}

// Function to send the push subscription to the server
export async function sendPushSubscriptionToServer(
  subscription: PushSubscription
) {
  // Send a POST request to the server with the subscription data
  const response = await fetch("/api/register-push", {
    method: "POST",
    body: JSON.stringify(subscription),
  });

  // If the response is not OK, throw an error
  if (!response.ok) {
    throw Error("Failed to send push subscription to server");
  }
}

// Function to delete the push subscription from the server
export async function deletePushSubscriptionFromServer(
  subscription: PushSubscription
) {
  // Send a DELETE request to the server with the subscription data
  const response = await fetch("/api/register-push", {
    method: "DELETE",
    body: JSON.stringify(subscription),
  });

  // If the response is not OK, throw an error
  if (!response.ok) {
    throw Error("Failed to delete push subscription from server");
  }
}
