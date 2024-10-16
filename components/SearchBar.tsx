"use client";
import React, { useState } from "react";
import { SearchManufacturer } from "./"; // Import your custom manufacturer search component
import Image from "next/image";
import { useRouter } from "next/navigation";

// SearchButton component for reuse
const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
    <Image
      src={"/magnifying-glass.svg"}
      alt={"magnifying glass"}
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
);

// SearchBar component
const SearchBar = ({
  setManufacturer,
  setModel,
}: {
  setManufacturer: React.Dispatch<React.SetStateAction<string>>;
  setModel: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [searchManufacturer, setSearchManufacturer] = useState("");
  const [searchModel, setSearchModel] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation for empty input
    if (searchManufacturer === "" && searchModel === "") {
      return alert("Please provide some input");
    }

    // Update the parent component's states
    setModel(searchModel);
    setManufacturer(searchManufacturer);

    // Optional: Perform routing if needed (e.g., to refresh results)
    // router.push(`/search?manufacturer=${searchManufacturer}&model=${searchModel}`);
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      {/* Manufacturer Search Input */}
      <div className="searchbar__item">
        <SearchManufacturer
          selected={searchManufacturer}
          setSelected={setSearchManufacturer}
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>

      {/* Model Search Input */}
      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="car model"
        />
        <input
          type="text"
          name="model"
          value={searchModel}
          onChange={(e) => setSearchModel(e.target.value)}
          placeholder="Tiguan..."
          className="searchbar__input"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>

      {/* Submit Button for larger screens */}
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
