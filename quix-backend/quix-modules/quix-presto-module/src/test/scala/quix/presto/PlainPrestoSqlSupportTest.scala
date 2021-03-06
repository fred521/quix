package quix.presto

import org.specs2.mutable.Specification
import quix.presto.PlainPrestoSqlSupport.{getSessionProperties => session, splitToStatements => split}

class PlainPrestoSqlSupportTest extends Specification {

  "PlainPrestoSqlSupport.splitToStatements" should {
    "handle single line statements" in {
      split("select 1") must contain("select 1")
    }

    "handle delimited statements" in {
      split("select 1;select 2") must contain("select 1", "select 2")
    }

    "handle delimited statements with empty partial statement" in {
      split("select 1;select 2;") must contain("select 1", "select 2")
    }

    "handle delimited statements with many empty lines between them" in {
      val newlines = List.fill(10)("\n").mkString
      val sql = "select 1;" + newlines + "select 2"
      split(sql) must contain("select 1", "select 2")
    }

  }

  "PlainPrestoSqlSupport.getSessionProperties" should {
    "handle statements without session params" in {

      val sql = session("select 1")
      sql.text === "select 1"
      sql.session must beEmpty
    }

    "handle statements with session params" in {
      val sql = session("set session foo = 123;\nselect 1")
      sql.text === "select 1"
      sql.session === Map("foo" -> "123")
    }
  }
}
