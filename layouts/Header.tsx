import BigQueryIcon from "@/components/icons/BigQueryIcon";
import CssIcon from "@/components/icons/CssIcon";
import FlowIcon from "@/components/icons/FlowIcon";
import GoIcon from "@/components/icons/GoIcon";
import HTMLIcon from "@/components/icons/HTMLIcon";
import JSONIcon from "@/components/icons/JSONIcon";
import OpenApiIcon from "@/components/icons/OpenApiIcon";
import PugIcon from "@/components/icons/PugIcon";
import ReactIcon from "@/components/icons/ReactIcon";
import ShuffleIcon from "@/components/icons/ShuffleIcon";
import SvgIcon from "@/components/icons/SvgIcon";
import TypeScriptIcon from "@/components/icons/TypeScriptIcon";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const fromMap: Record<string, any> = {
  svg: {
    name: "SVG",
    icon: <SvgIcon />,
    to: {
      jsx: {
        name: "JSX",
        icon: <ReactIcon className="w-5 h-5" />,
      },
      rn: {
        name: "React Native",
        icon: <ReactIcon className="w-5 h-5" />,
      },
    },
  },
  html: {
    name: "HTML",
    icon: <HTMLIcon></HTMLIcon>,
    to: {
      jsx: {
        name: "JSX",
        icon: <ReactIcon className="w-5 h-5" />,
      },
      pug: {
        name: "PUG",
        icon: <PugIcon className="w-5 h-5" />,
      },
    },
  },
  json: {
    name: "JSON",
    icon: <JSONIcon></JSONIcon>,
    to: {
      "big-query": {
        name: "Big Query Schema",
        icon: <BigQueryIcon className="w-5 h-5" />,
      },
      flow: {
        name: "Flow",
        icon: <FlowIcon className="w-5 h-5" />,
      },
      "go-bson": {
        name: "Go Bson",
        icon: <GoIcon className="w-5 h-5" />,
      },
      go: {
        name: "Go Struct",
        icon: <GoIcon className="w-5 h-5" />,
      },
      typescript: {
        name: "TypeScript",
        icon: <TypeScriptIcon />,
      },
      graphql: {
        name: "GraphQL",
      },
      yaml: {
        name: "YAML",
      },
    },
  },
  // css: {
  //   name: "CSS",
  //   icon: <CssIcon />,
  //   to: {
  //     tailwind: {
  //       name: "Tailwind",
  //     },
  //   },
  // },
  "open-api": {
    name: "OpenApi",
    icon: <OpenApiIcon></OpenApiIcon>,
    to: {
      ts: {
        name: "TypeScript",
        icon: <TypeScriptIcon></TypeScriptIcon>,
      },
    },
  },
};

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const router = useRouter();
  const route = router.route;
  const routeFromKey = Object.keys(fromMap).find((from) => {
    return route.indexOf(from) > -1;
  });
  const currentTo = routeFromKey
    ? route.replaceAll(`/${routeFromKey}-to-`, "")
    : "";
  const [currentFrom, setCurrentFrom] = useState<string>(routeFromKey || "");
  const toMap =
    currentFrom && fromMap[currentFrom] ? fromMap[currentFrom].to : [];
  const isCurFrom = currentFrom == routeFromKey;

  return (
    <header>
      <div className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75">
        <Link href="/" passHref>
          <a className="flex items-center">
            <svg
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              className="w-8 h-8 fill-indigo-600 stroke-current"
            >
              <path d="M12.13 35c-1.75 0-3.25-1.1-3.25-3.59 0-3.85 3.32-6.77 4.82-7.6a30.41 30.41 0 0 0 4.28 2 15.67 15.67 0 0 1-7.1-13.28c0-5.2 2.74-7.53 5.21-7.53 2 0 6.69 2.19 6.69 10.57 0 9-4.71 19.43-10.65 19.43Z" />
              <path d="M19.7 32.14c0 1.31.46 1.82 1.16 1.82 1.75 0 4.53-4.08 4.43-8.36 2.65-2.8 5.83-7.18 5.83-10.69 0-.85-.25-1.56-1.25-1.56-1.54 0-3.74 2.65-5.13 5.28s-2.61 5.84-4.28 10.12a10.88 10.88 0 0 0-.76 3.39Z" />
            </svg>
            <span className="font-bold text-xl ml-3">Trans</span>
          </a>
        </Link>
        <div className="ml-10 flex gap-2">
          {Object.keys(fromMap).map((key) => {
            const from = fromMap[key];
            return (
              <a
                key={key}
                className={clsx(
                  "flex items-center gap-2 mx-1 px-3 py-2 text-sm font-semibold cursor-pointer rounded",
                  { "text-indigo-700 bg-indigo-100/50": key == currentFrom }
                )}
                onClick={() => {
                  setCurrentFrom(key);
                }}
              >
                <span>{from.icon}</span>
                <span>{from.name}</span>
              </a>
            );
          })}
        </div>
      </div>
      {Object.keys(toMap).length > 0 && (
        <div className="flex items-center flex-shrink-0 w-full px-10 shadow-b bg-gray-100 bg-opacity-75 border-t ">
          <div className="text-indigo-700 mr-3 font-bold flex items-center gap-3">
            <div>Transform To</div>
            <ShuffleIcon className="w-5 h-5 fill-indigo-600" />
          </div>
          {Object.keys(toMap).map((key) => {
            const to = toMap[key];
            return (
              <Link href={`/${currentFrom}-to-${key}`} key={key}>
                <a
                  key={key}
                  className={clsx(
                    "flex items-center gap-2 text-sm font-semibold  cursor-pointer p-2 ml-3",
                    {
                      "text-white-700 bg-indigo-500/80 text-white":
                        isCurFrom && key == currentTo,
                      "bg-gray-100/50 hover:bg-indigo-500": key != currentTo,
                    }
                  )}
                >
                  <span>{to.icon}</span>
                  <span>{to.name}</span>
                </a>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Header;
