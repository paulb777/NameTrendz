import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

public class Main {

	public static void main(String[] args) throws IOException {
        FileWriter writer = new FileWriter("/users/paulb/babyNames/out/names.js");
        writer.write("namesM=[];namesF=[];");
		for (int i = 1880; i <= 2009; i++) {
			convertFile(i, writer);
		}
        writer.close();
	}
	
	private static int length = 50;
    
    public static void convertFile(int year, FileWriter writer) throws IOException {
    	String fileString = "/users/paulb/babyNames/yob" + year + ".txt";
        File file = new File(fileString);
        BufferedReader reader = new BufferedReader(new FileReader(file));
        String line = "";
    	ArrayList<String> maleArray = new ArrayList<String>();
    	ArrayList<String> femaleArray = new ArrayList<String>();
    	int m = 0;
    	int f = 0;
        while((line = reader.readLine()) != null && (m < length || f < length)) {
        	String[] tokens = line.split("[, ]+");
        	String name = tokens[0];
        	String sex = tokens[1];
//        	int count = Integer.parseInt(tokens[2]);
        	if (sex.equals("M")) {
        		if (m++ < length) maleArray.add("'" + name + "'");
        	} else if (sex.equals("F")) {
        		if (f++ < length) femaleArray.add("'" + name + "'");
        	} else {
        		throw new Error("Bad Sex data");
        	}        	
        }
        reader.close();
        writer.write("namesM[" + year + "]=" + maleArray.toString().replaceAll("\\s+","") + ";\n");
        writer.write("namesF[" + year + "]=" + femaleArray.toString().replaceAll("\\s+","") + ";\n");
    }
}