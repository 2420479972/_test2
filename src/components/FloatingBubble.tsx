import React, { useEffect, useState, useCallback } from "react";
import swap from "/swap.png";

interface Position {
  x: number;
  y: number;
}

export default function FloatingBubble() {
  const [rootFontSize, setRootFontSize] = useState(() =>
    parseFloat(window.getComputedStyle(document.body).fontSize)
  );
  // 计算尺寸和边距
  const size = rootFontSize * 3;
  const margin = rootFontSize * 0.625;

  const [position, setPosition] = useState<Position>(() => ({
    x: window.innerWidth - size - margin,
    y: window.innerHeight - size - margin,
  }));
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState<Position>({ x: 0, y: 0 });

  // 动态更新 rootFontSize
  useEffect(() => {
    const updateData = () => {
      const fontSize = parseFloat(
        window.getComputedStyle(document.body).fontSize
      );
      const offset = 3.625 * fontSize;

      setRootFontSize(fontSize);

      setPosition({
        x: window.innerWidth - offset,
        y: window.innerHeight - offset,
      });
    };

    window.addEventListener("resize", updateData);
    return () => window.removeEventListener("resize", updateData);
  }, []);

  // 处理拖动开始
  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    const isTouches = "touches" in e;
    if (!isTouches) {
      e.preventDefault();
      e.stopPropagation();
    }

    setIsDragging(true);

    const clientX = isTouches ? e.touches[0].clientX : e.clientX;
    const clientY = isTouches ? e.touches[0].clientY : e.clientY;

    setStartPos({
      x: clientX - position.x,
      y: clientY - position.y,
    });
  };

  // 处理拖动
  const handleDrag = useCallback(
    (e: TouchEvent | MouseEvent) => {
      if (!isDragging) return;
      const isTouches = "touches" in e;

      const clientX = isTouches ? e.touches[0].clientX : e.clientX;
      const clientY = isTouches ? e.touches[0].clientY : e.clientY;

      const newX = clientX - startPos.x;
      const newY = clientY - startPos.y;

      const maxX = window.innerWidth - size;
      const maxY = window.innerHeight - size;

      setPosition({
        x: Math.min(Math.max(0, newX), maxX),
        y: Math.min(Math.max(0, newY), maxY),
      });
    },
    [isDragging, size, startPos]
  );

  // 处理拖动结束
  const handleDragEnd = useCallback(() => {
    setIsDragging(false);

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const shouldMoveToRight = position.x > screenWidth / 2;

    setPosition(({ y }) => {
      let newY = y;
      if (y < margin) {
        newY = margin;
      } else if (y > screenHeight - size - margin) {
        newY = screenHeight - size - margin;
      }

      return {
        x: shouldMoveToRight ? screenWidth - size - margin : margin,
        y: newY,
      };
    });
  }, [margin, position, size]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleDrag);
      window.addEventListener("touchmove", handleDrag);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchend", handleDragEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleDrag);
      window.removeEventListener("touchmove", handleDrag);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [handleDrag, handleDragEnd, isDragging]);

  const toPancake = () => {
    window.open("https://pancakeswap.finance/");
  };

  return (
    <div
      className="fixed z-10 cursor-pointer select-none touch-none transition-transform duration-300 ease-out will-change-transform"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isDragging ? "none" : "transform 0.3s ease-out",
      }}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      onClick={toPancake}
    >
      <img src={swap} alt="" className="w-[3em] h-[3em]" />
    </div>
  );
}
