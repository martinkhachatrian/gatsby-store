interface Props {
  text: string;
  highlight: string;
}

const ComingSoon = ({ text, highlight }: Props) => {
  return (
    <div className="text-center mt-12 text-2xl text-gray-700">
      {text} <span className="text-indigo-600 font-bold">{highlight}</span>...
    </div>
  );
};

export default ComingSoon;