import React from "react";
import Tag from "./Tag";

interface ITag {
  id: string;
  label: string;
}

interface ITagGroupProps {
  tags: ITag[];
  selectedTags: string[];
  setSelectedTags: (tags: string[] | string) => void; 
  mode?: "single" | "multiple";
}

const TagGroup: React.FC<ITagGroupProps> = ({
  tags,
  mode = "single",
  selectedTags,
  setSelectedTags,
}) => {
  const handleTagClick = (id: string) => {
    if (mode === "single") {
      setSelectedTags(id);
    } else {
      setSelectedTags(
        selectedTags.includes(id)
          ? selectedTags.filter((tagId) => tagId !== id)
          : [...selectedTags, id]
      );
    }
  };

  return (
    <div className="flex gap-3">
      {tags.map((tag) => (
        <div key={tag.id} onClick={() => handleTagClick(tag.id)}>
          <Tag
            id={tag.id}
            label={tag.label}
            active={selectedTags.includes(tag.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default TagGroup;
