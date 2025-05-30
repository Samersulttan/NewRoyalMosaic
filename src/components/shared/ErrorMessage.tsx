interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">عذراً، حدث خطأ</h2>
        <p className="text-gray-400">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;