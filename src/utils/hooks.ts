import { useEffect, useState } from "react";

const useKeyPress = (
  targetKey: string[] | string,
): {
  [key: string]: boolean;
} => {
  const [keyPressed, setKeyPressed] = useState({
    // items if the string array
    // is passed in if it is an array, else it's just the one item
    ...(Array.isArray(targetKey)
      ? targetKey.reduce((acc, key) => ({ ...acc, [key]: false }), {})
      : { [targetKey]: false }),
  });

  useEffect(() => {
    const downHandler = (e: KeyboardEvent) => {
      if (
        (Array.isArray(targetKey) && targetKey.includes(e.key)) ||
        e.key === targetKey
      ) {
        if (["ArrowUp", "ArrowDown"].includes(e.key)) {
          e.preventDefault();
        }
        setKeyPressed((prev) => ({ ...prev, [e.key]: true }));
      }
    };

    const upHandler = ({ key }: { key: string }) => {
      if (
        (Array.isArray(targetKey) && targetKey.includes(key)) ||
        key === targetKey
      ) {
        setKeyPressed((prev) => ({ ...prev, [key]: false }));
      }
    };

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [targetKey]);

  return keyPressed;
};

export { useKeyPress };
