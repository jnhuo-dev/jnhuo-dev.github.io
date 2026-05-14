type TagProps = {
  children: string;
};

export default function Tag({ children }: TagProps) {
  return <span className="tag">{children}</span>;
}
