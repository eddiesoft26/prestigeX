TAKE NOTE WHEN DEALING WITH REFERRALS CODE: capture it from param.
Best Professional Practice (Very Important)

Even if referral code exists in URL, you should:

Store it in state

Prefill hidden input

Send with request

Example:

<!-- <input type="hidden" value={referralCode || ""} /> -->

This ensures the referral is never lost when user refreshes.

Senior-level tip (used in real fintech apps)

Many systems also store referral code temporarily in localStorage:

localStorage.setItem("referralCode", referralCode);

Then at signup:

const referralCode =
searchParams.get("ref") || localStorage.getItem("referralCode");

This ensures referral still works even if user visits homepage first before registering.
REFERRAL SYSTEM FLOW
URL → frontend capture → attach to signup payload → backend validate
