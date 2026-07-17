import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Relay Bank Review (2026) | Vanguard Business Services",
  description:
    "Read our Relay Bank Review for 2026. Learn about features, fees, eligibility, and whether Relay is a good option for US LLC owners.",
};

export default function RelayBankReviewPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">
        Relay Bank Review (2026)
      </h1>

      <p className="mb-4">
        Relay is one of the most popular business banking platforms for
        startups, LLC owners, and online businesses.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        What Is Relay?
      </h2>

      <p>
        Relay provides business banking services through partner banks and
        focuses on helping businesses manage cash flow and expenses.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Key Features
      </h2>

      <ul className="list-disc pl-6 space-y-2">
        <li>Multiple Checking Accounts</li>
        <li>Virtual Debit Cards</li>
        <li>QuickBooks Integration</li>
        <li>No Monthly Fees</li>
        <li>Team Permissions</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Pros
      </h2>

      <ul className="list-disc pl-6">
        <li>Modern UI</li>
        <li>Great for Startups</li>
        <li>No Monthly Fees</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Cons
      </h2>

      <ul className="list-disc pl-6">
        <li>No Physical Branches</li>
        <li>Eligibility Requirements Apply</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Final Verdict
      </h2>

      <p>
        Relay is a strong option for many US businesses. Always review the
        latest requirements and official policies before opening an account.
      </p>

      <div className="mt-12 rounded-lg border p-6">
        <h3 className="text-xl font-bold mb-2">
          Need Help?
        </h3>

        <p>
          Vanguard Business Services can help with US LLC formation, EIN,
          and business banking guidance.
        </p>
      </div>
    </main>
  );
}