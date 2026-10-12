export const AW_CONVERSION_ID = 'AW-11025885187';

// The /loans form's own conversion action, "Loan form submitted (tag)": a
// website action of the Submit lead form category, secondary (observation
// only), count one, no value. It exists so the Google tag has an event to send
// the applicant's hashed contact details with — Google keeps them beside the
// click, and when the routing engine later uploads the sale hashed the same
// way (routing-engine/src/core/user-data.js, which bkform shares) Google
// matches the two: "enhanced conversions for leads". The label was minted in
// the Google Ads UI on 2026-10-12 (the account's conversion setup wizard,
// "Submit lead form" category, secondary, count one, value 0); while it is
// empty nothing fires and nothing is set.
export const LOANS_LEAD_FORM_LABEL = 'WTyhCJOgz5odEIPQxokp';

// bkform:user-data → gtag. `userData` is already gtag's user_data shape with
// pre-hashed fields (sha256_email_address, sha256_phone_number[],
// address{sha256_first_name, sha256_last_name, postal_code, country}) — never a
// raw value. `transactionId` is bkform's application id, so the short-form and
// full-form stages of one application count once. Returns whether it fired.
// An opted-out browser never gets here (BkFormEmbed.jsx), and its gtag is a
// no-op anyway (index.html).
export const fireLoansLeadConversion = ({ userData, transactionId }) => {
	if (!LOANS_LEAD_FORM_LABEL || !userData || typeof window.gtag !== 'function') return false;
	try {
		window.gtag('set', 'user_data', userData);
		window.gtag('event', 'conversion', {
			send_to: `${AW_CONVERSION_ID}/${LOANS_LEAD_FORM_LABEL}`,
			...(transactionId ? { transaction_id: transactionId } : {}),
		});
		return true;
	} catch (e) {
		console.warn('Failed to fire the loan-form conversion:', e.stack);
		return false;
	}
};

const fireAdwordsEvent = (vertical) => {
	try{
        window.gtag('event', 'conversion', {
            'send_to': `${AW_CONVERSION_ID}/kAMpCK_99IIYEIPQxokp`
        });
		return;
	} catch (e){
		console.warn('Failed to fire Adwords conversion:', e.stack);
		return;
	}	
};

export default fireAdwordsEvent;
