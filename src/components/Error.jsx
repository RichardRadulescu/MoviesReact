// ErrorMessage.jsx
import "../styles/error.css"

export function ErrorMessage({ message }) {
    return (
        <div className="error-message">
            <strong>Error:</strong> {message || "Something went wrong"}
        </div>
    );
}
