
import ClipLoader from "react-spinners/ClipLoader"

export default function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <ClipLoader
        color="#ffffff"
        size={40}
        loading={true}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
