import { DataStream } from "../dataStream/DataStream";


export class Color4 {
   /** 红色 */
   public red: number;
   /** 绿色 */
   public green: number;
   /** 蓝色 */
   public blue: number;
   /** 透明 */
   public alpha: number;

   /**
    * 构造处理。
    *
    * @param red 红色
    * @param green 绿色
    * @param blue 蓝色
    * @param alpha 透明
    */
   public constructor(red: number = 0, green: number = 0, blue: number = 0, alpha: number = 1) {
      this.red = red;
      this.green = green;
      this.blue = blue;
      this.alpha = alpha;
   }


   /**
    * 序列化数据到输出流里。
    *
    * @param input 数据流
    */
   public serialize(output: DataStream) {
      output.writeFloat(this.red);
      output.writeFloat(this.green);
      output.writeFloat(this.blue);
      output.writeFloat(this.alpha);
   }

   /**
    * 从输入流里反序列化数据。
    *
    * @param input 输入流
    */
   public unserialize(input: DataStream) {
      this.red = input.readFloat();
      this.green = input.readFloat();
      this.blue = input.readFloat();
      this.alpha = input.readFloat();
   }
}
