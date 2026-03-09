type NotFoundPlaceholderProps = {
  sectionName: string;
};

export const NotFoundPlaceholder: React.FC<NotFoundPlaceholderProps> = ({
  sectionName,
}) => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
      <p className="text-5xl font-semibold text-[#101010]"></p>
      <h1 className="mt-2 text-xl font-medium text-[#101010]">Page Not Found</h1>
      <p className="mt-1 text-sm text-[#878787]">
        {sectionName} page is not available yet.
      </p>
    </div>
  );
};
