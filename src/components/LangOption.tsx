import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LangOption = () => {
  const changeLang = (lang: string) => {
    localStorage.setItem("lang", lang);
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">
          <Languages />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={`w-48 p-2 shadow-lg rounded-lg `}
      >
        <DropdownMenuItem onClick={() => changeLang("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLang("ru")}>
          Russian
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLang("ko")}>
          한국어
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLang("uz")}>
          O'zbekcha
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LangOption;
