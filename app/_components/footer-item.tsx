import { Card, CardContent } from "./ui/card";

const FooterItem = () => {
    return ( 
        <footer>
          <Card>
            <CardContent className="px-5 py-6">
              <p className="text-sm text-gray-400">
              insira aqui o texto do footer do figma <span className="font-bold">FSW Barber</span>
              </p>
            </CardContent>
          </Card>
        </footer>
     );
}
 
export default FooterItem;