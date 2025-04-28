interface EmptyStateProps {
  title: string;
  description: string;
}

const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default EmptyState;