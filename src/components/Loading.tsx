const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="animate-spin rounded-full size-[3.5em] border-b-[0.25em] border-[#1691FF]" />
    </div>
  );
};

export default Loading;
