import org.w3c.dom.*;
import javax.xml.parsers.*;
import java.io.*;

public class DOM {
    public static void main(String[] args) {
        try {
            File xmlDoc = new File("reed.xml");
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            DocumentBuilder db = dbf.newDocumentBuilder();
            Document d = db.parse(xmlDoc);
//            System.out.println(d.getDocumentElement().getNodeName());
            d.getDocumentElement().normalize();
            NodeList n = d.getElementsByTagName("course");
            for(int i=0;i<n.getLength();i++)
            {

                Node node = n.item(i);
                Element course = (Element) node;
                String subj = course.getElementsByTagName("subj").item(0).getTextContent();
                Element place = (Element) course.getElementsByTagName("place").item(0);
//                System.out.println(place);
                String building = place.getElementsByTagName("building").item(0).getTextContent();
                String room = place.getElementsByTagName("room").item(0).getTextContent();
//                System.out.println(building);
//                System.out.println(room);
                if(subj.equals("MATH") && building.equals("LIB") && room.equals("204"))
                    System.out.println(course.getElementsByTagName("title").item(0).getTextContent());
            }

        }
        catch (Exception e)
        {
            System.out.println(e);
        }
    }
}

