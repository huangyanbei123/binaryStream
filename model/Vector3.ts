import { DataTypeEnum } from "./DataTypeEnum";
import { DataStream } from "../dataStream/DataStream";

/**
 * 三维向量。
 */
export class Vector3 {
   /** X分量 */
   public x: number;
   /** Y分量 */
   public y: number;
   /** Z分量 */
   public z: number;

	/**
	 * 构造处理。
	 *
	 * @param x X分量
	 * @param y Y分量
	 * @param z Z分量
	 */
   public constructor(x?: number, y?: number, z?: number) {
      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0;
   }

	/**
	 * 序列化数据到输出流里。
	 *
	 * @param output 数据流
	 * @param dataCd 数据类型
	 * @return 向量
	 */
   public serialize(output: DataStream, dataCd: DataTypeEnum = DataTypeEnum.Float32): Vector3 {
      switch (dataCd) {
         case DataTypeEnum.Int32:
            output.writeInt32(this.x);
            output.writeInt32(this.y);
            output.writeInt32(this.z);
            break;
         case DataTypeEnum.Float32:
            output.writeFloat(this.x);
            output.writeFloat(this.y);
            output.writeFloat(this.z);
            break;
         case DataTypeEnum.Float64:
            output.writeDouble(this.x);
            output.writeDouble(this.y);
            output.writeDouble(this.z);
            break;
         default:
      }
      return this;
   }

	/**
	 * 从输入流里反序列化数据。
	 *
	 * @param input 数据流
	 * @param dataCd 数据类型
	 * @return 向量
	 */
   public unserialize(input: DataStream, dataCd: DataTypeEnum = DataTypeEnum.Float32): Vector3 {
      switch (dataCd) {
         case DataTypeEnum.Int32:
            this.x = input.readInt32();
            this.y = input.readInt32();
            this.z = input.readInt32();
            break;
         case DataTypeEnum.Float32:
            this.x = input.readFloat();
            this.y = input.readFloat();
            this.z = input.readFloat();
            break;
         case DataTypeEnum.Float64:
            this.x = input.readDouble();
            this.y = input.readDouble();
            this.z = input.readDouble();
            break;
         default:

      }
      return this;
   }
}
