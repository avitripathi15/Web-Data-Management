import javax.xml.xpath.*;
import org.xml.sax.InputSource;
import org.w3c.dom.*;


public class Xpath {
    static void display ( String condition) throws Exception {
        XPathFactory dbf = XPathFactory.newInstance();
        XPath db = dbf.newXPath();
        InputSource source = new InputSource("reed.xml");
        NodeList nl = (NodeList) db.evaluate(condition,source,XPathConstants.NODESET);
        for (int i = 0; i < nl.getLength(); i++) {
            System.out.println(nl.item(i).getTextContent());
        }
        System.out.println("TOTAL = "+nl.getLength()+"\n");
    }

//    try {
//            XpathFactory dbf = DocumentBuilderFactory.newInstance();
//            DocumentBuilder db = dbf.newDocumentBuilder();
//            InputSource d = db.parse(new InputSource("reed.xml"));
//            XPath xp = XPathFactory.newInstance().newXPath();
//            NodeList nl = (NodeList)xp.evaluate(cdt,"reed.xml",XPathConstants.NODESET);
//            for (int i = 0; i < nl.getLength(); i++) {
//                System.out.println(nl.item(i).getNodeValue()+"\n");
//            }
//            System.out.println(nl);

    public static void main(String[] args) {
        try {
            System.out.println("All MATH courses in room LIB 204: \n");
            display("//root//course[subj=\"MATH\" and place//building=\"LIB\" and place//room=\"204\"]//title");





            System.out.println("Instructor for MATH 412: \n");
            display("//root//course[subj=\"MATH\" and crse=\"412\"]//instructor");

            System.out.println("Wieting's Courses: \n");
            display("//root//course[instructor=\"Wieting\"]//title");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}






