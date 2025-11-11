// src/pages/IntentionPage.tsx
import IntentionForm from "../components/IntentionForm";
import { IntentionProvider } from "../contexts/IntentionContext";


export default function IntentionPage() {
    return (
        <IntentionProvider>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <IntentionForm />
            </div>
        </IntentionProvider>
    );
}
