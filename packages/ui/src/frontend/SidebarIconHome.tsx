import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "#/ui/tooltip";
import Link from "next/link";
import React from "react";

function SidebarIcon(props: {
  link: string;
  children:
    | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | Promise<
        | React.ReactPortal
        | React.ReactElement<
            unknown,
            string | React.JSXElementConstructor<unknown>
          >
        | Iterable<React.ReactNode>
      >;

  tooltipText: string;
}) {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={props.link}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              {props.children}
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">{props.tooltipText}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}

SidebarIcon.propTypes = {};

export default SidebarIcon;
